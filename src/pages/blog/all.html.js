/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import {graphql, Link} from 'gatsby';
import Layout from 'components/Layout';
import Container from 'components/Container';
import Header from 'components/Header';
import TitleAndMetaTags from 'components/TitleAndMetaTags';
import React from 'react';
import {urlRoot} from 'site-constants';
import {colors, media, sharedStyles} from 'theme';
import toCommaSeparatedList from 'utils/toCommaSeparatedList';
import MetaTitle from 'templates/components/MetaTitle';

import type {allMdxData} from 'types';

type Props = {
  data: allMdxData,
  location: Location,
};

const AllBlogPosts = ({data, location}: Props) => (
  <Layout location={location}>
    <Container>
      <div css={sharedStyles.articleLayout.container}>
        <div css={sharedStyles.articleLayout.content}>
          <Header>All Posts</Header>
          <TitleAndMetaTags
            canonicalUrl={`${urlRoot}/blog/all.html`}
            title="React - All Posts"
          />
          <ul
            css={{
              display: 'flex',
              flexWrap: 'wrap',
              marginLeft: -40,
            }}>
            {data.allMdx.edges.map(({node}) => (
              <li
                css={{
                  paddingLeft: 40,
                  paddingTop: 40,
                  borderTop: '1px dotted #ececec',
                  paddingBottom: 40,
                  width: '100%',

                  [media.size('medium')]: {
                    width: '50%',
                  },

                  [media.greaterThan('large')]: {
                    width: '33.33%',
                  },
                }}
                key={node.fields.slug}>
                <h2
                  css={{
                    fontSize: 24,
                    color: colors.dark,
                    lineHeight: 1.3,
                    fontWeight: 700,
                  }}>
                  <Link
                    css={{
                      borderBottom: '1px solid #ececec',
                      ':hover': {
                        borderBottomColor: colors.black,
                      },
                    }}
                    key={node.fields.slug}
                    to={node.fields.slug}>
                    {node.frontmatter.title}
                  </Link>
                </h2>
                <MetaTitle>{node.fields.date}</MetaTitle>
                {node.frontmatter.author ? (
                  <div
                    css={{
                      color: colors.subtle,
                      marginTop: -5,
                    }}>
                    by{' '}
                    {toCommaSeparatedList(node.frontmatter.author, author => (
                      <span key={author.frontmatter.name}>
                        {author.frontmatter.name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  </Layout>
);

export const pageQuery = graphql`
  query AllBlogPostsPageQuery {
    allMdx(
      filter: {fileAbsolutePath: {regex: "/blog/"}}
      sort: {fields: [fields___date], order: DESC}
    ) {
      edges {
        node {
          frontmatter {
            title
            author {
              frontmatter {
                name
                url
              }
            }
          }
          fields {
            date(formatString: "MMMM DD, YYYY")
            slug
          }
        }
      }
    }
  }
`;

export default AllBlogPosts;
