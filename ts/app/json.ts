import * as Global from './globals';


export function customStringify(object: any) {
	let indentation = Global.indent;
    
	function newLine(tabs: number) {
		var string = '\n'
		for (var i = 0; i < tabs; i++) {
			string += indentation;
		}
		return string;
	}
	function escape(string: string) {
		return string.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n|\r\n/g, '\\n').replace(/\t/g, '\\t')
	}
	function handleVar(obj: any, tabs: number, breaks = true) {
		var out = ''
		if (typeof obj === 'string') {
			//String
			out += '"' + escape(obj) + '"'
		} else if (typeof obj === 'boolean') {
			//Boolean
			out += (obj ? 'true' : 'false')
		} else if (obj === null || obj === Infinity || obj === -Infinity) {
			//Null
			out += 'null'
		} else if (typeof obj === 'number') {
			//Number
			obj = (Math.round(obj*100000)/100000).toString()
			out += obj + (obj % 1 != 0 ? '' : '.0');
		} else if (obj instanceof Global.integer) {
			//Integer
			obj = (Math.round(obj.int)).toString()
			out += obj;
        } else if (obj instanceof Array) {
			//Array
			let has_content = false
			// let multiline = !!obj.find(item => typeof item === 'object');
			let multiline = true;
			if (!multiline) {
				let length = 0;
				obj.forEach(item => {
					length += typeof item === 'string' ? (item.length+4) : 3;
				});
				if (length > 140) multiline = true;
			}
			out += '['
			for (var i = 0; i < obj.length; i++) {
				var compiled = handleVar(obj[i], tabs+1)
				if (compiled) {
					if (has_content) {out += ',' + (multiline ? '' : ' ')}
					if (multiline) {out += newLine(tabs)}
					out += compiled
					has_content = true
				}
			}
			if (multiline) {out += newLine(tabs-1)}
			out += ']'
		} else if (typeof obj === 'object') {
			//Object
			breaks = breaks && !obj.constructor.name.includes('OneLiner');
			var has_content = false
			out += '{'
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					var compiled = handleVar(obj[key], tabs+1, breaks)
					if (compiled) {
						if (has_content) {out += ',' + (breaks ? '' : ' ')}
						if (breaks) {out += newLine(tabs)}
						out += '"' + escape(key) + '":' + ' '
						out += compiled
						has_content = true
					}
				}
			}
			if (breaks && has_content) {out += newLine(tabs-1)}
			out += '}'
		}
		return out;
	}
	return handleVar(object, 1)
}