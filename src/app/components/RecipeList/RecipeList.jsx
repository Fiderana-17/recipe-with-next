import RecipeCard from '../ReciepeCard/ReciepeCard'
import styles from './RecipeList.module.css'

export default function RecipeList({ recipes }) {
  return (
    <ul className={styles.list}>
      {recipes.map((recipe, index) => (
        <li key={index} className={styles.item}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  )
}