import React from 'react';
import moment from 'moment';
import { Box, Grid, Typography, withStyles } from '@material-ui/core';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import SearchContext from 'contexts/SearchContext';
import Month from 'components/calendar/Month';
import MoreDetails from 'components/calendar/MoreDetails';
import BookingButton from 'components/table/BookingButton';
import { Language } from 'constants/interfaces';

type CalendarProps = {
  interpreters: Array<any>;
  setInterpreter: Function;
};

const OutlinedGridItem = withStyles({
  root: {
    minHeight: '275px',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderLeft: 'solid 1px #DFECFF',
    borderTop: 'solid 1px #DFECFF',
    borderBottom: 'solid 1px #DFECFF',
    '&:last-child': {
      borderRight: 'solid 1px #DFECFF',
    },
  },
})(Grid);

const FlexBox = withStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})(Box);

SearchContext.displayName = 'SearchContext';

const Row = ({ data, index, style }: any) => {
  const { search, interpreters, setInterpreter } = data;
  const i = interpreters[index];
  const langs = search.language
    ? i?.languages.filter((l: Language) => l.languageName === search.language)
    : i?.languages;
  return (
    <Box mb={1} mt={1} key={i?.id} style={style}>
      <Grid container>
        <OutlinedGridItem item xs={3}>
          <Box mb={1}>
            <Typography variant="subtitle1">
              {i.firstName} {i.lastName}
            </Typography>
          </Box>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle1">Level:</Typography>
            </Grid>

            <Grid item xs={6}>
              <Grid container justify="flex-start" direction="column">
                {langs.map((l: Language) => (
                  <Grid
                    item
                    xs={12}
                    key={l.languageName}
                  >{`Lv ${l?.level} - ${l?.languageName}`}</Grid>
                ))}
              </Grid>
            </Grid>

            {(i?.distance || i?.distance === 0) && (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">Distance:</Typography>
                </Grid>
                <Grid item xs={6}>
                  {`${i.distance} km`}
                </Grid>
              </>
            )}
          </Grid>
          <FlexBox mt={1}>
            <BookingButton
              conflicts={i.conflicts}
              onClick={() => setInterpreter(i)}
            >
              Book
            </BookingButton>
            <Box px={1}>
              <MoreDetails
                search={search}
                interpreter={i}
                setInterpreter={setInterpreter}
              />
            </Box>
          </FlexBox>
        </OutlinedGridItem>
        <OutlinedGridItem item xs={3}>
          <Month start={0} bookings={i?.bookings} />
        </OutlinedGridItem>
        <OutlinedGridItem item xs={3}>
          <Month start={1} bookings={i?.bookings} />
        </OutlinedGridItem>
        <OutlinedGridItem item xs={3}>
          <Month start={2} bookings={i?.bookings} />
        </OutlinedGridItem>
      </Grid>
    </Box>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CalendarListWithReactWindow = ({
  search,
  interpreters,
  setInterpreter,
}: any) => {
  return (
    <div style={{ width: '2000px', height: '900px' }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            width={width}
            itemCount={interpreters.length}
            itemSize={279}
            itemData={{ interpreters, search, setInterpreter }}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  );
};

const CalendarList = ({ search, interpreters, setInterpreter }: any) => {
  return (
    <>
      {interpreters.map((i: any) => {
        const langs = search.language
          ? i?.languages.filter(
              (l: Language) => l.languageName === search.language
            )
          : i?.languages;
        return (
          <Box mb={1} mt={1} key={i?.id}>
            <Grid container>
              <OutlinedGridItem item xs={3}>
                <Box mb={1}>
                  <Typography variant="subtitle1">
                    {i.firstName} {i.lastName}
                  </Typography>
                </Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Level:</Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Grid container justify="flex-start" direction="column">
                      {langs.map((l: Language) => (
                        <Grid
                          item
                          xs={12}
                          key={l.languageName}
                        >{`Lv ${l?.level} - ${l?.languageName}`}</Grid>
                      ))}
                    </Grid>
                  </Grid>

                  {(i?.distance || i?.distance === 0) && (
                    <>
                      <Grid item xs={6}>
                        <Typography variant="subtitle1">Distance:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {`${i.distance} km`}
                      </Grid>
                    </>
                  )}
                </Grid>
                <FlexBox mt={1}>
                  <BookingButton
                    conflicts={i.conflicts}
                    onClick={() => setInterpreter(i)}
                  >
                    Book
                  </BookingButton>
                  <Box px={1}>
                    <MoreDetails
                      search={search}
                      interpreter={i}
                      setInterpreter={setInterpreter}
                    />
                  </Box>
                </FlexBox>
              </OutlinedGridItem>
              <OutlinedGridItem item xs={3}>
                <Month start={0} bookings={i?.bookings} />
              </OutlinedGridItem>
              <OutlinedGridItem item xs={3}>
                <Month start={1} bookings={i?.bookings} />
              </OutlinedGridItem>
              <OutlinedGridItem item xs={3}>
                <Month start={2} bookings={i?.bookings} />
              </OutlinedGridItem>
            </Grid>
          </Box>
        );
      })}
    </>
  );
};

const MemoCalendarList = React.memo(CalendarList);

function Calendar({ interpreters, setInterpreter }: CalendarProps) {
  return (
    <SearchContext.Consumer>
      {({ search }) => (
        <Box>
          <Grid container>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                Interpreters ({interpreters.length} results)
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                {moment().format('MMMM YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                {moment().add(1, 'month').format('MMMM YYYY')}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">
                {moment().add(2, 'month').format('MMMM YYYY')}
              </Typography>
            </Grid>
          </Grid>
          {interpreters.length > 25 ? (
            <div style={{ width: '100%', height: '600px' }}>
              <AutoSizer>
                {({ height, width }) => (
                  <List
                    height={height}
                    width={width}
                    itemCount={interpreters.length}
                    itemSize={279}
                    itemData={{ interpreters, search, setInterpreter }}
                  >
                    {Row}
                  </List>
                )}
              </AutoSizer>
            </div>
          ) : (
            <MemoCalendarList
              search={search}
              interpreters={interpreters}
              setInterpreter={setInterpreter}
            />
          )}
        </Box>
      )}
    </SearchContext.Consumer>
  );
}

export default React.memo(Calendar);
