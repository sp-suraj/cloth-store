import "./HomeDirectory.styles.scss";
import CategoryItem from "../components/category-item/category-item";

function HomeDirectory({ categories }) {
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          title={category.title}
          imageUrl={category.imageUrl}
        />
      ))}
    </div>
  );
}

export default HomeDirectory;
