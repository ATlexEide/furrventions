export async function filterCons(filterArgs) {
  let filtered = filterArgs.cons.slice();
  const hasActiveTags = Object.values(filterArgs.activeTags).includes(true);
  filterArgs.setHasFilter(true);

  if (hasActiveTags) {
    let tagArray = Object.keys(filterArgs.activeTags).filter(
      (key) => filterArgs.activeTags[key]
    );

    const tagChecker = (con) => {
      let tagCount = tagArray.length;
      tagArray.forEach((tag) => {
        if (tag && JSON.parse(con.tags).includes(tag)) {
          tagCount--;
        }
      });
      return !tagCount;
    };

    filtered = filtered.filter((con) => tagChecker(con));
    filterArgs.setFilteredCons(filtered);
  }

  if (filterArgs.filter?.name) {
    filtered = filtered.filter((con) =>
      con.name.toLowerCase().includes(filterArgs.filter.name.toLowerCase())
    );
    filterArgs.setFilteredCons(filtered);
  }

  if (filterArgs.filter?.location) {
    const regex = new RegExp(`.*${filterArgs.filter.location.toLowerCase()}.*`);
    filtered = filtered.filter((con) => regex.test(con.location.toLowerCase()));
    filterArgs.setFilteredCons(filtered);
  }

  if (filtered && filterArgs.filter?.spots_total)
    filtered = filterArgs.cons.filter(
      (con) => con.spots_total <= filterArgs.filter.spots_total
    );

  filterArgs.setFilteredCons(filtered);
}
