import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      // 1. ask the read function for those items
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // if there are items AND ther arent enough items to satisfy how many were requested AND we are on the last page → THEN just send it
      if (items.length && (items.length !== first) & (page === pages)) {
        return items;
      }

      if (items.length !== first) {
        // we dont have any items and must fetch them from the network
        return false;
      }

      // if there are items
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo.`
        );
        return items;
      }

      return false;
      // We can do one of two things:
      // a. return the items because they are already in the cache
      // b. return false from here (network req)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // runs when Apollo client comes back from the network with our products
      console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      console.log('merged:');
      console.log(merged);
      return merged;
    },
  };
}
