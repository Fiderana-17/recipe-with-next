'use client'

import { useState } from 'react'
import recipes from './components/data/recipes.json'
import styles from './page.module.css'
import RecipeList from './components/RecipeList/RecipeList'

export default function Home() {
  const [orderedRecipes, setOrderedRecipes] = useState(recipes)

  function handleToggleOrder() {
    setOrderedRecipes((prev) => [...prev].reverse())
  }

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Recipe Book</h1>
          <button
            type="button"
            className={styles.toggle}
            onClick={handleToggleOrder}
          >
            Reverse order
          </button>
        </div>
      </header>
      <main className={styles.main}>
        <RecipeList recipes={orderedRecipes} />
      </main>
    </div>
  )
}