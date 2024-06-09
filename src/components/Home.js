import React, { useState } from 'react';
import './Home.css';
import { HackathonCardsData } from './HackathonCardsData';
import {Link} from 'react-router-dom';

const App = () => {
  // State hooks for managing various UI states
  const [searchText, setSearchText] = useState(''); // Text entered in the search bar
  const [isFocused, setIsFocused] = useState(false); // Focus state of the search bar
  const [isHovered, setIsHovered] = useState(false); // Hover state of the search bar
  const [isPasting, setIsPasting] = useState(false); // Pasting state of the search bar
  const [isDropdownVisible, setIsDropdownVisible] = useState(false); // Visibility of the profile dropdown menu
  const [isDarkMode, setIsDarkMode] = useState(false); // Theme state (dark/light mode)
  const [activeTab, setActiveTab] = useState('Completed'); // Active tab in the filter section
  const [filter, setFilter] = useState('All'); // Filter selection in the filter section

  // Event handler for search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Event handler for paste action in the search input
  const handlePaste = (e) => {
    setIsPasting(true);
    setTimeout(() => setIsPasting(false), 2000); // Reset pasting state after 2 seconds
  };

  // Toggle visibility of the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Toggle between dark and light themes
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode'); // Toggle dark mode class on the body element
  };

  // Changing active tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // Changing filter option
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filtering hackathon cards based on active tab, selected filter, and search text
  const filteredHackathonCards = HackathonCardsData.filter(card => {
    const matchesTab = card.status === activeTab;
    const matchesFilter = filter === 'All' || card.tags.includes(filter);
    const matchesSearch = card.title.toLowerCase().includes(searchText.toLowerCase()) || 
                          card.organizer.toLowerCase().includes(searchText.toLowerCase()) ||
                          card.tags.some(tag => tag.toLowerCase().includes(searchText.toLowerCase()));
    return matchesTab && matchesFilter && matchesSearch;
  });

  // Rendering main component
  return (
    <div className={`home ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="header">
        <Link to="/" className="logo">
          <svg width="52" height="35" viewBox="0 0 52 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.6306 0.703125L20.0747 9.35883V26.3274L35.6306 34.9832L51.1865 26.3274V9.35883M35.6306 5.6523L44.0752 10.3444L35.6306 15.0365L27.2082 10.3444M0.0742188 7.13063V11.4156H15.6301V7.13063M24.5192 13.7938L33.4083 18.743V28.7913L24.5192 23.8636M46.742 13.7938V23.8636L37.8529 28.7913V18.743M4.51877 15.7006V19.9856H15.6301V15.7006M8.96331 24.2706V28.5557H15.6301V24.2706" fill="#FF9800"/>
          </svg>
          <p>jiffyscan</p> 
        </Link>

        {/* If neccessory we can use react-router-dom from routing the page */}
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#blockchain">Blockchain</a>
          <a href="#developers">Developers</a>
          <a href="#more">More</a>
          <a href="#about">About 4337</a>
        </nav>
        <div className="search-container">
          <div className={`search ${isFocused ? 'focused' : ''} ${isHovered ? 'hovered' : ''} ${isPasting ? 'pasting' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <span className="icon">⚡</span>
            <input
              type="text"
              placeholder="Search an userOp"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onPaste={handlePaste}
            />
          </div>
        </div>
        <div className="profile" onClick={toggleDropdown}>
          <div className='profile-image'>
            OR
            <span></span>
          </div>
          <div className='profile-details'>
            <div className="profile-name">Olivia Rhye</div>
            <div className="profile-email">olivia@jiffyscan.xyz</div>
          </div>
          {isDropdownVisible && (
            <div className="dropdown">
              <a href="#view-profile">View profile</a>
              <a href="#dashboard">Dashboard</a>
              <a href="#api">API</a>
              <a href="#logout">Log out</a>
              <button onClick={toggleTheme}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className='filter-container'>
          <div className="tabs">
            <p>Work History | </p>
            <button 
              className={activeTab === 'Completed' ? 'active' : ''}
              onClick={() => handleTabChange('Completed')}
            >
              Completed
            </button>
            <button 
              className={activeTab === 'In Review' ? 'active' : ''}
              onClick={() => handleTabChange('In Review')}
            >
              In Review
            </button>
          </div>
          <div className="filter">
            <label htmlFor="filterBy"> | &nbsp; Filter By:</label>
            <select id="filterBy" value={filter} onChange={handleFilterChange}>
              <option value="All">All</option>
              <option value="Design">Design</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Content">Content</option>
            </select>
          </div>
          <div className="search">
            <span className="icon">⚡</span>
            <input
              type="text"
              placeholder="Search Bounties, Profile and more..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="hackathon-cards">
          {filteredHackathonCards.map(card => (
            <div key={card.id} className="hackathon-card">
              <img src={card.image} alt="Hackathon Logo" className="card-logo" />
              <div className="card-left">
                <div className="card-title-container">
                  <h3>{card.title}  <span> <small> by </small>  {card.organizer}</span></h3>
                  <div>
                    <p className="reward">{card.reward}</p>
                    <div className="tags">
                      {card.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-right">  
                <p className="date">{card.date}</p>
                <p className="participants">{card.participants} Participants</p>  
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
