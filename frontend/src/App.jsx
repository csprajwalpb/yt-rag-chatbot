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
    if (!url) { 
      alert('Please enter a YouTube URL') 
      return
    }

    setLoading(true)
    try{
      //call api to process video
      const res = await processVideo(url)

      if (res.data.error) {
        alert(res.data.error)
        return
      }
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
  <div className="min-h-screen bg-gradient-to-br from-slate-900 
  to-slate-800 flex justify-center items-center p-4">

    {/*Chatbot UI*/}
    <div className="w-full max-w-3xl h-[90vh] bg-white/10 backdrop-blur-lg 
    border border-white/20 rounded-2xl shadow-xl flex flex-col overflow-hidden">

    <div className="p-4 border-b border-white/20 text-center">
      <h1 className="text-xl font-semibold text-white">Youtube RAG Chatbot</h1>
      </div>

      {/*Video URL input*/}
      <div className="p-4 flex gap-2 border-b border-white/10">
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <button onClick={handleProcessVideo}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white">
          {loading ? 'Processing Video...' : 'Process'}
        </button>
      </div>

      {/*Question input*/}
      <div className="p-4 border-t border-white/10 flex gap-2">
        <input
          type="text"
          placeholder="Ask a question about the video"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        />
        <button onClick={handleAskQuestion} 
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">
          {loading ? 'Thinking...' : 'Ask'}
        </button>
      </div>

      {/*Chat Display*/}
      <div className="space-y-4 max-h-[400px] overflow-y-auto">
        {chat.map((entry, index) => (
          <div key={index} className="border rounded p-4">
            <p className="font-semibold text-gray-700"><strong>You:</strong> {entry.q}</p>
            <p className="text-blue-600 mt-2"><strong>AI:</strong> {entry.a}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
)
}

export default App