// MENU SELECTION

var news_cards = document.querySelectorAll('[id^=news-entry-card]');
var data_story_card = document.querySelectorAll('[id^=data-story-card]');
var opinion_card = document.querySelectorAll('[id^=opinion-card]');

function opinion_menu(){
  document.getElementById("opinion-menu")
          .addEventListener("click", function() {
          for(let i = 0; i < opinion_card.length; i++) {
            opinion_card[i].hidden = false;
          }
          for(let i = 0; i < data_story_card.length; i++) {
            data_story_card[i].hidden = true;
          }
          for(let i = 0; i < news_cards.length; i++) {
            news_cards[i].hidden = true;
          }
        })
      }

opinion_menu()

function news_menu(){
  document.getElementById("news-entry-menu")
          .addEventListener("click", function() {
            for(let i = 0; i < opinion_card.length; i++) {
              opinion_card[i].hidden = true;
            }
            for(let i = 0; i < data_story_card.length; i++) {
              data_story_card[i].hidden = true;
            }
            for(let i = 0; i < news_cards.length; i++) {
              news_cards[i].hidden = false;
            }
        })
      }

news_menu()

function data_story_menu(){
  document.getElementById("data-story-menu")
          .addEventListener("click", function() {
            for(let i = 0; i < opinion_card.length; i++) {
              opinion_card[i].hidden = true;
            }
            for(let i = 0; i < data_story_card.length; i++) {
              data_story_card[i].hidden = false;
            }
            for(let i = 0; i < news_cards.length; i++) {
              news_cards[i].hidden = true;
            }
        })
      }

data_story_menu()
