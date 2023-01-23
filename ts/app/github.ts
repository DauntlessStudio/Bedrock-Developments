import { Octokit } from 'octokit';
import * as axios from 'axios';

export async function requestGet(path: string) {
    let octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    try {
        await octokit.rest.users.getAuthenticated();
    } catch (error) {
        throw error;
    }
      
    return await octokit.request(`GET /repos/{owner}/{repo}${path}`, {
      owner: process.env.GITHUB_OWNER,
      repo: process.env.GITHUB_REPO
    });
}

export async function requestURL(url: string) {
    let octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    try {
        await octokit.rest.users.getAuthenticated();
    } catch (error) {
        throw error;
    }
      
    return await octokit.request(url, {});
}

export async function requestVanilla(file: string, dir: string|undefined = undefined) {
    try {
        dir = dir ? `+path:${dir}`: '';
        let response = await axios.default.get(`https://api.github.com/search/code?q=+repo:Mojang/bedrock-samples+filename:${file}${dir}`);
        
        return response.data.items;
    } catch (error) {
        console.log(error);
    }
}