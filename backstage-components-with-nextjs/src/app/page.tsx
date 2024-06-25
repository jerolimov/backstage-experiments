"use client";

import { Page, Header, Content, LinkButton, ItemCardGrid, ItemCardHeader } from '@backstage/core-components';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default function Home() {
  return (
    // From https://backstage.io/storybook/?path=/story/layout-content--default
    <Page themeId="home">
      {/* From https://backstage.io/storybook/?path=/story/inputs-button--button-links */}
      <LinkButton to="/admin">Go to admin</LinkButton>

      {/* From https://backstage.io/storybook/?path=/story/layout-header--default */}
      <Header title="Administration" />

      {/* From https://backstage.io/storybook/?path=/story/layout-item-cards--default */}
      <Content>
        <ItemCardGrid>
          {Array.from(Array(10).keys()).map((index) => (
            <Card key={index}>
              <CardMedia>
                <ItemCardHeader title={`Card #${index}`} subtitle="Subtitle" />
              </CardMedia>
              <CardContent>
                {text
                  .split(' ')
                  .slice(0, 10 + Math.floor(index % 30) * 3)
                  .join(' ')}
              </CardContent>
              <CardActions>
                <LinkButton color="primary" to="/catalog">
                  Go There!
                </LinkButton>
              </CardActions>
            </Card>
          ))}
        </ItemCardGrid>

      </Content>
    </Page>
  );
}
