'use client'

import { useState } from 'react'
import recipes from './components/data/recipes.json'
import styles from './page.module.css'
import RecipeList from './components/RecipeList/RecipeList'

// Calcul global hors composant
const ALL_INGREDIENTS = Array.from(
  new Set(recipes.flatMap(r => r.ingredients))
).sort()

function filterRecipes(recipes, search, selectedIngredients) {
  return recipes.filter(recipe => {
    const matchesSearch = !search || 
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.category.toLowerCase().includes(search.toLowerCase())
    
    const matchesIngredients = selectedIngredients.length === 0 || 
      selectedIngredients.every(ing => recipe.ingredients.includes(ing))
    
    return matchesSearch && matchesIngredients
  })
}

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)
  const [search, setSearch] = useState('')
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const filtered = filterRecipes(orderedRecipes, search, selectedIngredients)

  function toggleIngredient(ingredient) {
    setSelectedIngredients(prev => 
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    )
  }

  function clearFilters() {
    setSearch('')
    setSelectedIngredients([])
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            className={styles.toggle}
            onClick={() => setOrderedRecipes(p => [...p].reverse())}
          >
            Reverse order
          </button>
        </div>
        
        {/* Barre de recherche centrée */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <svg 
              className={styles.searchIcon} 
              viewBox="0 0 20 20" 
              fill="currentColor"
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" 
                clipRule="evenodd" 
              />
            </svg>
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            {search && (
              <button
                className={styles.clearButton}
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Filtres d'ingrédients en cases à cocher */}
        <div className={styles.filtersSection}>
          <p className={styles.filterLabel}>Filter by ingredients:</p>
          <div className={styles.checkboxGrid}>
            {ALL_INGREDIENTS.map(ingredient => (
              <label key={ingredient} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => toggleIngredient(ingredient)}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                <span className={styles.ingredientName}>
                  {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                </span>
              </label>
            ))}
          </div>
          
          {selectedIngredients.length > 0 && (
            <button
              className={styles.clearFilters}
              onClick={() => setSelectedIngredients([])}
            >
              Clear ingredients ({selectedIngredients.length})
            </button>
          )}
        </div>

        <p className={styles.resultsInfo}>
          {filtered.length} recipe{filtered.length !== 1 && 's'} found
          {(search || selectedIngredients.length > 0) && (
            <button className={styles.clearAll} onClick={clearFilters}>
              Clear all
            </button>
          )}
        </p>
      </header>
      
      <main className={styles.main}>
        {filtered.length > 0 ? (
          <RecipeList recipes={filtered} />
        ) : (
          <div className={styles.emptyState}>
            <p>No recipes match your filters.</p>
            <button className={styles.clearFilters} onClick={clearFilters}>
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  )
}