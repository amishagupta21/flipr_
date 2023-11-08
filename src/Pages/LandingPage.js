import React, { useState, useEffect } from 'react';
import styles from "./LandingPage.module.css"
import Navbar from '../Components/Navbar';
import MultipleWinnersScreen from '../Components/MultipleWinnerSection';

const LandingPage = () => {
  const [prizeData, setPrizeData] = useState(null);
  const [filteredPrizes, setFilteredPrizes] = useState(null);
  

  // Fetch Nobel Prize data when the component mounts
  useEffect(() => {
    fetch('https://api.nobelprize.org/v1/prize.json')
      .then((response) => response.json())
      .then((data) => {
        setPrizeData(data);
        setFilteredPrizes(data.prizes);
        const multipleWinners = filterMultipleWinners(data.prizes);
        setFilteredPrizes(multipleWinners);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  const filterMultipleWinners = (prizes) => {
    return prizes.filter((prize) => prize.laureates.length > 1);
  };

  const handleFilter = (filterText, selectedCategory, selectedYear) => {
    let filtered = prizeData.prizes;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(prize => prize.category === selectedCategory);
    }

    
    if (selectedYear !== 'all') {
      filtered = filtered.filter(prize => prize.year === selectedYear);
    }

    if (filterText) {
      const filterTextLower = filterText.toLowerCase();
      filtered = filtered.filter(prize => {
        return (
          prize.category.toLowerCase().includes(filterTextLower) ||
          prize.laureates.some(laureate => 
            laureate.firstname.toLowerCase().includes(filterTextLower) ||
            laureate.surname.toLowerCase().includes(filterTextLower)
          )
        );
      });
    }

    setFilteredPrizes(filtered);
  };

  return (
    <div className={styles.container}>
      <Navbar onFilter={handleFilter} prizes={prizeData && prizeData.prizes} />
      <div className={styles.prizeContainer}>
        {filteredPrizes ? (
          <div className={styles.prizeInformation}>
            <h2>Nobel Prize Data</h2>
            {filteredPrizes.map((prize, index) => (
              <div key={index} className={styles.prizesCategory}>
                <p>Category: {prize.category}</p>
                <p>Year: {prize.year}</p>
                <h4>Laureates:</h4>
                {prize.laureates && Array.isArray(prize.laureates) ? (
                  prize.laureates.map((laureate, laureateIndex) => (
                    <div key={laureateIndex} className={styles.prizeHolderName}>
                      <p>
                        First Name: {laureate.firstname}<br />
                        Surname: {laureate.surname}<br />
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No laureates data available</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Loading Nobel Prize data...</p>
        )}
      </div>
      <MultipleWinnersScreen multipleWinners={filteredPrizes}/>

    </div>
  );
};

export default LandingPage;
