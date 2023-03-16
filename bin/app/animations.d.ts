/**
 * @remarks adds new server side animations
 * @param names the animation names to add as entity.name
 * @param loop should the animation loop
 * @param commands the commands to run at 0.0
 * @param time the animation length
 */
export declare function createNewAnimation(names: string[], loop: boolean, commands: string[], time: number): Promise<void>;
/**
 * @remarks adds new client side animations
 * @param names the animation names to add as entity.name
 * @param animation_contents the animation itself as a json object
 */
export declare function createNewClientAnimation(names: string[], animation_contents: any): Promise<void>;
/**
 * @remarks adds new server side animation controller
 * @param names the controller names as entity.name
 * @param entry the commands to run in on_enter
 * @param exit the command to run in on_exit
 * @param anim the animations to run
 * @param query the query to enter the state
 * @param transition the querty to exit the state
 */
export declare function createNewController(names: string[], entry: string[], exit: string[] | undefined, anim: string[] | undefined, query: string, transition: string | undefined): Promise<void>;
