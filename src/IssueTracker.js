import * as React from 'react';

import { useQuery, gql } from "@apollo/client";


const ISSUES = gql`
query GetIssues {

    issues {
      id,
      title,
      description,
      author {
        name
      },
      assignee {
        name
      },
      comments {
        id,
        content,
        author {
          name
        }
      }
    }

}
`

export default function IssueTracker() {

    const { loading, error, data } = useQuery(ISSUES);

    console.log({ loading, error, data })

    if (loading) {
        return <div>loading...</div>
    }

    if (error) {
        return <div>
            <code>error.message</code>
        </div>
    }

    return <ul>
        {data.issues.map((issue) => {
            return <li style={{ border: '1px solid #eee' }}>
                <div>
                    <p>title: {issue.title}</p>
                    <p>description: {issue.description}</p>
                    <p>author: {issue.author.name}</p>
                    <p>assignee: {issue.assignee.name}</p>
                </div>
            </li>
        })}
    </ul>
};
