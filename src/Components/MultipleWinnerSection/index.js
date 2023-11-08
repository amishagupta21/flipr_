import React from 'react';
import styles from "./index.module.css";

const MultipleWinnersSection = ({ multipleWinners }) => {
    const uniqueNames = new Set();
    const uniqueWinnersData = [];

    if (multipleWinners && multipleWinners.length > 0) {
        multipleWinners.forEach((laureate) => {
            if (laureate.laureates && Array.isArray(laureate.laureates)) {
                laureate.laureates.forEach((laureateItem) => {
                    if (
                        laureateItem.share > 1 &&
                        laureateItem.firstname &&
                        laureateItem.surname
                    ) {
                        const fullName = laureateItem.firstname + ' ' + laureateItem.surname;

                        if (!uniqueNames.has(fullName)) {
                            uniqueNames.add(fullName);
                            uniqueWinnersData.push({
                                name: fullName,
                                score: laureateItem.share,
                                motivation: laureateItem.motivation,
                            });
                        }
                    }
                });
            }
        });
    }

    return (
        <div className={`${styles.multipleWinners} ${styles.slideIn}`}>
            <h2>Nobel Prize Winners who have won more than once</h2>
            {uniqueWinnersData.length > 0 ? (
                <ul>
                    {uniqueWinnersData.map((item, itemIndex) => (
                        <li key={itemIndex}>
                            <p>
                                <strong>Name:</strong> {item.name}
                                <br />
                                <strong>Score:</strong> {item.score}
                                <br />
                                <strong>Motivation:</strong> {item.motivation}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No Nobel laureates have won more than one Nobel Prize.</p>
            )}
        </div>
    );
};

export default MultipleWinnersSection;
