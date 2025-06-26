import { useState, useRef } from "react"
import { Upload, Download, Play, Volume2, ImageIcon, FileText, Mic } from "lucide-react"
import "./App.css"

function App() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [inputType, setInputType] = useState("text")
  const [textInput, setTextInput] = useState("")
  const [audioFile, setAudioFile] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState(null)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)
  const audioInputRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleAudioUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setAudioFile(file)
    }
  }

  const generateVideo = async () => {
    if (!selectedImage || (inputType === "text" && !textInput) || (inputType === "audio" && !audioFile)) {
      alert("Please provide all required inputs!")
      return
    }

    setIsGenerating(true)
    setProgress(0)

    // Simulate video generation with progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          setGeneratedVideo("/placeholder.svg?height=400&width=600")
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const downloadVideo = () => {
    // Simulate video download
    const link = document.createElement("a")
    link.href = generatedVideo
    link.download = "generated-video.mp4"
    link.click()
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="background-container">
        <div className="gradient-bg"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="title-speak">Speak</span>
            <span className="title-portrait">Portrait</span>
          </h1>
          <p className="subtitle">Transform your images and voice into stunning speaking portraits</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          {/* Input Section */}
          <div className="input-section font-mono">
            <div className="card glass-card text-center">
              <h2 className="section-title">Upload Your Content</h2>

              {/* Image Upload */}
              <div className="upload-area">
                <div
                  className={`upload-box ${selectedImage ? "has-content" : ""}`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {selectedImage ? (
                    <div className="uploaded-image">
                      <img src={selectedImage || "/placeholder.svg"} alt="Uploaded" />
                      <div className="upload-overlay">
                        <Upload className="upload-icon" />
                        <span>Change Image</span>
                      </div>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <ImageIcon className="upload-icon" />
                      <span>Click to upload image</span>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </div>

              {/* Input Type Selection */}
              <div className="input-type-selector">
                <button
                  className={`type-btn ${inputType === "text" ? "active" : ""}`}
                  onClick={() => setInputType("text")}
                >
                  <FileText className="btn-icon" />
                  Text Input
                </button>
                <button
                  className={`type-btn ${inputType === "audio" ? "active" : ""}`}
                  onClick={() => setInputType("audio")}
                >
                  <Mic className="btn-icon" />
                  Audio Input
                </button>
              </div>

              {/* Text/Audio Input */}
              {inputType === "text" ? (
                <div className="text-input-area">
                  <textarea
                    className="text-input"
                    placeholder="Enter your text description here..."
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    rows={4}
                  />
                </div>
              ) : (
                <div className="audio-input-area">
                  <div
                    className={`audio-upload-box ${audioFile ? "has-content" : ""}`}
                    onClick={() => audioInputRef.current?.click()}
                  >
                    {audioFile ? (
                      <div className="audio-file-info">
                        <Volume2 className="audio-icon" />
                        <span>{audioFile.name}</span>
                      </div>
                    ) : (
                      <div className="audio-placeholder">
                        <Mic className="upload-icon" />
                        <span>Click to upload audio</span>
                      </div>
                    )}
                  </div>
                  <input
                    ref={audioInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {/* Generate Button */}
              <button className="generate-btn" onClick={generateVideo} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <div className="spinner"></div>
                    Generating... {progress}%
                  </>
                ) : (
                  <>
                    <Play className="btn-icon" />
                    Generate Video
                  </>
                )}
              </button>

              {/* Progress Bar */}
              {isGenerating && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          {generatedVideo && (
            <div className="output-section">
              <div className="card glass-card">
                <h2 className="section-title">Generated Video</h2>
                <div className="video-container">
                  <div className="video-placeholder">
                    <img src={generatedVideo || "/placeholder.svg"} alt="Generated Video" />
                    <div className="video-overlay">
                      <Play className="play-icon" />
                    </div>
                  </div>
                </div>
                <button className="download-btn" onClick={downloadVideo}>
                  <Download className="btn-icon" />
                  Download Video
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3D Floating Elements */}
      <div className="floating-3d-elements">
        <div className="cube cube-1"></div>
        <div className="cube cube-2"></div>
        <div className="sphere sphere-1"></div>
        <div className="sphere sphere-2"></div>
      </div>
    </div>
  )
}

export default App
