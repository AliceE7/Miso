ow.onload = () => {
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

  if(!accessToken) {
    return (document.getElementById('login').style.display = "block")
  }
  fetch('https://discord.com/api/users/@me', {
    headers: {
      authorization: `${tokenType} ${accessToken}`
    },
  })
  .then((res) => {
    res.json()
  })
  .then((res) => {
    const { username, discriminator } = res
    document.getElementById('info').innerText += `${username}#${discriminator}`
  })
  .catch(console.error)
}