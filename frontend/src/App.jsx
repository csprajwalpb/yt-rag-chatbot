import {useState} from 'react'
import {processVideo, askQuestion} from './api'

function App() {
  //for yt url input
  const [url, setUrl] = useState('')

  //for question input
  const [question, setQuestion] = useState('')

  //for chat history
  const [chat, setChat] = useState([])

  //for loading state
  const [loading, setLoading] = useState(false)

  //handle video processing
  const handleProcessVideo = async () => {
    if (!url) return alert('Please enter a YouTube URL')

    setLoading(true)
    try{
      //call api to process video
      await processVideo(url)
      alert('Video processed successfully! You can now ask questions.')
    }
    catch{
      alert('Failed to process video. Please check the URL and try again.')
    }
    setLoading(false)
  }
  
  //handle asking question
  const handleAskQuestion = async () => {
    if (!question) return alert('Please enter a question')
    setLoading(true)

    try{
      const res = await askQuestion(question)

    //update chat history
    setChat(prev => [...prev, {
        q: question,
        a: res.data.answer || res.data.error || 'No answer found.'
      }
    ])

    //clear question input
    setQuestion('')
    }
    catch{
      alert('Failed to get answer. Please try again.')
    }
    setLoading(false)
  }


return(
  <div>
    {/*Chatbot UI*/}
    <div>
      <h1>Youtube RAG Chatbot</h1>
      {/*Video URL input*/}
      <div>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button onClick={handleProcessVideo}>
          {loading ? 'Processing...' : 'Process Video'}
        </button>
      </div>
      {/*Question input*/}
      <div>
        <input
          type="text"
          placeholder="Ask a question about the video"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAskQuestion} disabled={loading}>
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {/*Chat Display*/}
      <div>
        {chat.map((entry, index) => (
          <div key={index}>
            <p><strong>You:</strong> {entry.q}</p>
            <p><strong>AI:</strong> {entry.a}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}

export default App