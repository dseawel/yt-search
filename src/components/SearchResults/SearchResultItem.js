import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';

const propTypes = {
  classes: PropTypes.object,
  searchResultItem: PropTypes.object,
};

const styles = {
  card: {
    maxWidth: 520,
    marginBottom: 20,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

const SearchResultItem = ({searchResultItem, classes}) => {
  const {
    snippet: {
      title,
      publishedAt,
      description,
      thumbnails: {
        high: {url: thumbnailUrl},
      },
    },
    id: {videoId},
    commentCount,
  } = searchResultItem;
  return (
    <Card className={classes.card}>
      <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
        <CardHeader
          title={decodeURI(title)}
          subheader={format(publishedAt, 'MMM D, YYYY h:mm a')}
        />
      </a>
      <CardMedia image={thumbnailUrl} title="title" className={classes.media} />
      <CardContent>
        <Typography component="p">{decodeURI(description)}</Typography>
        {commentCount && (
          <Typography component="em">
            {`Total Comments: ${commentCount}`}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

SearchResultItem.propTypes = propTypes;

export default withStyles(styles)(SearchResultItem);
