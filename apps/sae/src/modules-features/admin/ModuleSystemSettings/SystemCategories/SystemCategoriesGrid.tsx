import { SimpleGrid } from "@mantine/core";
import { categoriesList } from "./CategoriesList";
import CategoryCard from "./CategoryCard";
import { CustomFieldset } from "@aq-fe/core-ui/shared/components/layout/CustomFieldset";

export default function SystemCategoriesGrid() {
  return (
    <CustomFieldset title="Danh mục hệ thống">
      <SimpleGrid cols={{ base: 1, sm: 3, md: 3, lg: 4 }} spacing="md" verticalSpacing="md">
        {categoriesList.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </SimpleGrid>
    </CustomFieldset>
  );
}
