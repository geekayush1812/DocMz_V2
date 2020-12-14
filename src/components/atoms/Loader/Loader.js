import React from 'react';
import ContentLoader, {Rect, Circle} from 'react-content-loader/native';

const RowLoader = () => (
  <ContentLoader
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <Rect x="539" y="232" rx="3" ry="3" width="88" height="6" />
    <Rect x="587" y="226" rx="3" ry="3" width="52" height="6" />
    <Rect x="63" y="9" rx="3" ry="3" width="410" height="6" />
    <Rect x="63" y="25" rx="3" ry="3" width="180" height="6" />
    <Rect x="64" y="40" rx="3" ry="3" width="78" height="6" />
    <Circle cx="26" cy="25" r="20" />
  </ContentLoader>
);

const ListingWithThumbnailLoader = (props) => {
  return (
    <ContentLoader
      height={300}
      width={300}
      speed={3}
      primaryColor="#c2c2c2"
      secondaryColor="#ededed"
      {...props}>
      <Rect x="103" y="12" rx="3" ry="3" width="123" height="7" />
      <Rect x="102" y="152" rx="3" ry="3" width="171" height="6" />
      <Circle cx="44" cy="42" r="30" />
      <Circle cx="44" cy="147" r="30" />
      <Circle cx="44" cy="251" r="30" />
      <Rect x="105" y="117" rx="3" ry="3" width="123" height="7" />
      <Rect x="104" y="222" rx="3" ry="3" width="123" height="7" />
      <Rect x="105" y="48" rx="3" ry="3" width="171" height="6" />
      <Rect x="104" y="257" rx="3" ry="3" width="171" height="6" />
    </ContentLoader>
  );
};

ListingWithThumbnailLoader.metadata = {
  name: 'Rituraj ratan',
  github: 'riturajratan',
  description: 'Listing with thumbnail',
  filename: 'ListingWithThumbnail',
};

export {RowLoader, ListingWithThumbnailLoader};
