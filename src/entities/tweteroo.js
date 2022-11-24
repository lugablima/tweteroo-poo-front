import axios from 'axios';
import { Account } from './account';

export class Tweteroo {
    constructor() {
        this.account = new Account();
    }

    renderButtons() {
        const btnSignUp = document.querySelector('.btn-enviar');
        const btnPostTweet = document.querySelector('.btn-enviar-tweet');

        btnSignUp.addEventListener('click', () => this.account.signUp(this));
        btnPostTweet.addEventListener('click', () => this.account.postTweet(this));
    }

    loadTweets() {
        axios.get('http://localhost:5001/tweets').then(res => {
          const tweets = res.data;
          let tweetsHtml = '';
      
          for (const tweet of tweets) {
            tweetsHtml += `
              <div class="tweet">
                <div class="avatar">
                  <img src="${tweet.avatar}" />
                </div>
                <div class="content">
                  <div class="user">
                    @${tweet.username}
                  </div>
                  <div class="body">
                    ${this.escapeHtml(tweet.tweet)}
                  </div>
                </div>
              </div>
            `;
          }
      
          document.querySelector('.tweets').innerHTML = tweetsHtml;
          document.querySelector('.pagina-inicial').classList.add('hidden');
          document.querySelector('.tweets-page').classList.remove('hidden');
        });
    }

    escapeHtml(unsafe) {
        return unsafe
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
    }
}