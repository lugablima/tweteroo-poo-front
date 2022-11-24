import axios from 'axios';

export class Account {
  constructor() {
    this.username = null;
    this.avatar = null;       
  }

  signUp(tweteroo) {
    const username = document.querySelector('#username').value;
    const picture = document.querySelector('#picture').value;
  
    axios
      .post('http://localhost:5001/sign-up', {
        username,
        avatar: picture,
      })
      .then(() => {
        this.username = username;
        this.avatar = picture;
        tweteroo.loadTweets();
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao fazer cadastro! Consulte os logs.');
      });
  }

  postTweet(tweteroo) {
    const tweet = document.querySelector('#tweet').value;
  
    axios
      .post('http://localhost:5001/tweets', {
        username: this.username,
        tweet
      })
      .then(() => {
        document.querySelector('#tweet').value = '';
        tweteroo.loadTweets();
      })
      .catch(err => {
        console.error(err);
        alert('Erro ao fazer tweet! Consulte os logs.');
      });
  }
}