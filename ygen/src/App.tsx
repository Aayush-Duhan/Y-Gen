import Header from './components/Header'
import Hero from './components/Hero'
import MicroGroups from './components/Departments'
import EventSection from './components/Events'
import Footer from './components/Footer'
import Leadership from './components/Leadership'
import Winners from './components/Winners'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <Hero />
        <MicroGroups />
        <Leadership />
        <Winners />
        <EventSection 
          category="event"
          title="Upcoming"
          subtitle="Join us for exciting events that will enhance your skills and knowledge"
        />
        <EventSection 
          category="workshop"
          title="Featured"
          subtitle="Hands-on learning experiences led by industry experts"
        />
        <EventSection 
          category="hackathon"
          title="Upcoming"
          subtitle="Showcase your skills and compete in our coding challenges"
        />
      </main>
      <Footer />
    </div>
  )
}

export default App
