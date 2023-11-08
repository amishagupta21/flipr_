import React, { useState } from "react";
import styles from "./index.module.css";
import logo from "../../assests/images/fliprLogo.PNG";

const Navbar = ({ onFilter, prizes }) => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [filterText] = useState("");


    const handleFilterChange = () => {
        onFilter(filterText, selectedCategory, selectedYear);
    };

    const generateCategoryOptions = () => {
        if (!prizes || prizes.length === 0) {
            return (
                <option value="all">All Categories</option>
            );
        }

        // Extract unique categories from the prizes data
        const categories = ["all", ...new Set(prizes.map((prize) => prize.category))];

        return categories.map((category) => (
            <option key={category} value={category}>
                {category === "all" ? "All Categories" : category}
            </option>
        ));
    };

    const generateYearOptions = () => {
        if (!prizes || prizes.length === 0) {
            return (
                <option value="all">All Years</option>
            );
        }

        const startYear = 1900;
        const endYear = 2018;

        const years = ["all", ...Array.from({ length: endYear - startYear + 1 }, (_, i) => (endYear - i).toString())];

        return years.map((year) => (
            <option key={year} value={year}>
                {year === "all" ? "All Years" : year}
            </option>
        ));
    };

    return (
        <div className={styles.navbarHeader}>
            <img className={styles.logo} src={logo} alt="Flipr-Logo" />
            <div className={styles.filterContainer}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={styles.filterDropdown}
                >
                    {generateCategoryOptions()}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={styles.filterDropdown}
                >
                    {generateYearOptions()}
                </select>
                <button onClick={handleFilterChange} className={styles.filterButton}>
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default Navbar;
