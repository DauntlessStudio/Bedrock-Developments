import { Octokit } from 'octokit';

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

export async function requestVanilla(file: string, dir: string) {
    let octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    });

    try {
        await octokit.rest.users.getAuthenticated();
    } catch (error) {
        throw error;
    }
    
    return (await octokit.request(`GET /search/code`, {
        q: encodeURI(`minecraft+repo:Mojang/bedrock-samples+path:${dir}+filename:${file}`),
        per_page: 999
    })).data.items;
}