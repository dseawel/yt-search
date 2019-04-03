import React from 'react';
import renderer from 'react-test-renderer';
import {SearchResults} from 'components/SearchResults';

test('SearchResults renders without crashing', () => {
  const searchResults = [
    {
      commentCount: 0,
      id: {videoId: '5MI6GE0zeXg'},
      snippet: {
        publishedAt: '2019-03-25T19:12:21.000Z',
        title: 'Elite GamerEx vs JackHenry SUB TO MEH',
        thumbnails: {
          high: {
            url: 'https://i.ytimg.com/vi/5MI6GE0zeXg/hqdefault.jpg',
          },
        },
      },
      etag: '1',
    },
    {
      commentCount: 0,
      id: {videoId: 'fgtBbWTPL0w'},
      snippet: {
        publishedAt: '2012-12-22T07:22:04.000Z',
        title: 'Lumber-Jack Blues - Henry Mancini - Sometimes A Great Notion',
        thumbnails: {
          high: {
            url: 'https://i.ytimg.com/vi/fgtBbWTPL0w/hqdefault.jpg',
          },
        },
        description:
          'https://www.facebook.com/1960sFilmSoundtracksAndMovieFun Track 4 from the original soundtrack - composed by Henry Mancini from the 1970 film starring ...',
      },
      etag: '2',
    },
  ];
  const emptyComponent = <SearchResults searchResults={[]} />;
  let rendered = renderer.create(emptyComponent).toJSON();
  expect(rendered).toMatchSnapshot();
  const listComponent = <SearchResults searchResults={searchResults} />;
  rendered = renderer.create(listComponent).toJSON();
  expect(rendered).toMatchSnapshot();
});
