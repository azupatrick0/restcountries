const git = require('simple-git')()
const pushToGit = async (file) => {
  const remotes = await git.getRemotes();
  console.log(remotes, '===>>>>>')
  // await git.removeRemote('originwiki');
  const repo = 'https://github.com/azupatrick0/restcountries.wiki.git';
  if (remotes.length) {
    if(!remotes.map((remote) => remote.name).includes('upstream4')) {
      console.log('hehehehehehehh')
      await git.addRemote('upstream4', repo);
    }
  }
  //await git.addRemote('upstream', repo);
  //await git.pull(['upstream4', 'master', '--allow-unrelated-histories']);
  await git.add(`tester.md`);
  await git.add(`push-to-git.md`);
  await git.commit(`updated test md file`);
  await git.push(['upstream4', 'HEAD:master', '--force']);
  console.log('push to upstream succeeded===>>>>>');
}

export default pushToGit;