import React, {useState, useEffect} from 'react';
import alanBtn from '@alan-ai/alan-sdk-web'

import './App.css';
import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './styles.js'
import wordsToNumbers from 'words-to-numbers'
const alanKey = 'fb6736d0f1bf296fd48a2a37f622a86a2e956eca572e1d8b807a3e2338fdd0dc/stage'

function App() {

  const [newsArticles, setNewsArticles] = useState([])
  const [activeArticle, setActiveArticle] = useState(-1)
  const classes = useStyles()

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({command, articles, number}) => {
        if(command === 'newHeadlines'){
          setNewsArticles(articles)
          setActiveArticle(-1)
        } else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if( command === 'open'){
          const parsedNumber = number.length > 2 ? wordsToNumbers(number) : number;
          const article = articles[parsedNumber - 1]
          if(parsedNumber > 20) {
            alanBtn().playText('Please try that again')
          } else if (article) {
            window.open(article.url, '_blank')
            alanBtn().playText('Opening...')
          }
        }
      }
    })
  }, [])

  return (
    <div className="app">
      <div className={classes.logoContainer}>
        <img src="https://alan.app/voice/images/previews/preview.jpg" alt="Alan Logo" className={classes.alanLogo} />
        <span>Created by <a href="https://portfolio-a3c4a.web.app/" target="_blank">Francisco Tarantuviez</a></span>
      </div>
          <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
