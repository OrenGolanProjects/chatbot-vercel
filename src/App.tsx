import Chatbot from './components/Chatbot'
import './App.css'

function App() {
    return (
        <div className="app">
            {/* Hero Section */}
            <header className="hero">
                <div className="container">
                    <h1 className="hero-title">Welcome to Our Platform</h1>
                    <p className="hero-subtitle">
                        Experience the future of customer support with our intelligent chatbot assistant
                    </p>

                </div>
            </header>


            {/* Chatbot Component */}
            <Chatbot />
        </div>
    )
}

export default App