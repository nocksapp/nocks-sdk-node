/**
 * Transform Nocks pagination
 *
 * @param pagination
 */
const transform = (pagination) => Object.assign({}, pagination, {
  links: Array.isArray(pagination.links) ? {} : pagination.links,

  hasNext: () => !!(pagination.links && pagination.links.next),
  hasPrevious: () => !!(pagination.links && pagination.links.previous),

  getNextPage: () => pagination.current_page + 1,
  getPreviousPage: () => pagination.current_page - 1,
});

module.exports = {
  transform,
};
