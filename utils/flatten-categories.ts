export const flattenCategories = (categories: any[], prefix = "") => {
  let flatList: any[] = [];
  categories.forEach((category) => {
    flatList.push({
      _id: category._id,
      name: `${prefix}${category.name}`,
    });
    if (category.children && category.children.length > 0) {
      flatList = flatList.concat(
        flattenCategories(category.children, prefix + "--- ")
      );
    }
  });
  return flatList;
};
