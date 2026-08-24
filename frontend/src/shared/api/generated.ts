import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: string; output: string; }
};

/** Сообщение из формы обратной связи */
export type ContactModel = {
  __typename?: 'ContactModel';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

/** Результат демо-запроса: ступени + реальные данные с бэкенда */
export type DemoResultModel = {
  __typename?: 'DemoResultModel';
  /** Реальные данные, полученные с бэкенда */
  experiences: Array<ExperienceModel>;
  /** Количество записей опыта в базе */
  experiencesCount: Scalars['Int']['output'];
  /** Время ответа сервера (ISO) */
  serverTime: Scalars['String']['output'];
  /** Количество категорий навыков в базе */
  skillsCount: Scalars['Int']['output'];
  steps: Array<DemoStepModel>;
  totalDurationMs: Scalars['Int']['output'];
};

/** Одна ступень выполнения запроса (для анимации на фронте) */
export type DemoStepModel = {
  __typename?: 'DemoStepModel';
  /** Рекомендованная длительность анимации ступени, мс */
  durationMs: Scalars['Int']['output'];
  /** Машинный ключ ступени: validation | interceptor | parsing */
  key: Scalars['String']['output'];
  /** Человекочитаемая метка на выбранном языке */
  label: Scalars['String']['output'];
};

/** Тип записи: место работы (Job) или проект (Project) */
export enum ExperienceKind {
  Job = 'Job',
  Project = 'Project'
}

/** Локализованная запись опыта работы или проекта */
export type ExperienceModel = {
  __typename?: 'ExperienceModel';
  /** Достижения/буллеты на выбранном языке */
  bullets: Array<Scalars['String']['output']>;
  company: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  kind: ExperienceKind;
  location: Scalars['String']['output'];
  order: Scalars['Int']['output'];
  /** Период на выбранном языке */
  period: Scalars['String']['output'];
  /** Должность / роль на выбранном языке */
  role: Scalars['String']['output'];
  /** Технологический стек (для проектов) */
  stack: Array<Scalars['String']['output']>;
};

/** Язык, на котором вернуть локализованный контент */
export enum Language {
  En = 'EN',
  Ru = 'RU'
}

export type Mutation = {
  __typename?: 'Mutation';
  /** Отправить сообщение из формы обратной связи */
  submitContact: ContactModel;
};


export type MutationSubmitContactArgs = {
  input: SubmitContactInput;
};

export type Query = {
  __typename?: 'Query';
  /** Опыт работы для таймлайна */
  experiences: Array<ExperienceModel>;
  /** Health-check с локализованным приветствием */
  health: Scalars['String']['output'];
  /** Проекты */
  projects: Array<ExperienceModel>;
  /** Демо-запрос секции data-fetching: ступени выполнения + реальные данные */
  runDemo: DemoResultModel;
  /** Категории навыков */
  skills: Array<SkillModel>;
};


export type QueryExperiencesArgs = {
  lang?: Language;
};


export type QueryHealthArgs = {
  lang?: Language;
};


export type QueryProjectsArgs = {
  lang?: Language;
};


export type QueryRunDemoArgs = {
  lang?: Language;
};


export type QuerySkillsArgs = {
  lang?: Language;
};

/** Категория навыков со списком элементов */
export type SkillModel = {
  __typename?: 'SkillModel';
  /** Название категории на выбранном языке */
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<Scalars['String']['output']>;
  order: Scalars['Int']['output'];
};

export type SubmitContactInput = {
  email: Scalars['String']['input'];
  message: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type SkillsQueryVariables = Exact<{
  lang: Language;
}>;


export type SkillsQuery = { __typename?: 'Query', skills: Array<{ __typename?: 'SkillModel', id: string, category: string, items: Array<string>, order: number }> };

export type SubmitContactMutationVariables = Exact<{
  input: SubmitContactInput;
}>;


export type SubmitContactMutation = { __typename?: 'Mutation', submitContact: { __typename?: 'ContactModel', id: string, name: string, email: string, createdAt: string } };

export type RunDemoQueryVariables = Exact<{
  lang: Language;
}>;


export type RunDemoQuery = { __typename?: 'Query', runDemo: { __typename?: 'DemoResultModel', totalDurationMs: number, experiencesCount: number, skillsCount: number, serverTime: string, steps: Array<{ __typename?: 'DemoStepModel', key: string, label: string, durationMs: number }>, experiences: Array<{ __typename?: 'ExperienceModel', id: string, company: string, role: string, period: string }> } };

export type HealthQueryVariables = Exact<{
  lang: Language;
}>;


export type HealthQuery = { __typename?: 'Query', health: string };

export type ExperiencesQueryVariables = Exact<{
  lang: Language;
}>;


export type ExperiencesQuery = { __typename?: 'Query', experiences: Array<{ __typename?: 'ExperienceModel', id: string, kind: ExperienceKind, company: string, role: string, location: string, period: string, bullets: Array<string>, stack: Array<string>, order: number }> };

export type ProjectsQueryVariables = Exact<{
  lang: Language;
}>;


export type ProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'ExperienceModel', id: string, kind: ExperienceKind, company: string, role: string, location: string, period: string, bullets: Array<string>, stack: Array<string>, order: number }> };


export const SkillsDocument = gql`
    query Skills($lang: Language!) {
  skills(lang: $lang) {
    id
    category
    items
    order
  }
}
    `;

/**
 * __useSkillsQuery__
 *
 * To run a query within a React component, call `useSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useSkillsQuery(baseOptions: Apollo.QueryHookOptions<SkillsQuery, SkillsQueryVariables> & ({ variables: SkillsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
      }
export function useSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
        }
// @ts-ignore
export function useSkillsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SkillsQuery, SkillsQueryVariables>): Apollo.UseSuspenseQueryResult<SkillsQuery, SkillsQueryVariables>;
export function useSkillsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SkillsQuery, SkillsQueryVariables>): Apollo.UseSuspenseQueryResult<SkillsQuery | undefined, SkillsQueryVariables>;
export function useSkillsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
        }
export type SkillsQueryHookResult = ReturnType<typeof useSkillsQuery>;
export type SkillsLazyQueryHookResult = ReturnType<typeof useSkillsLazyQuery>;
export type SkillsSuspenseQueryHookResult = ReturnType<typeof useSkillsSuspenseQuery>;
export type SkillsQueryResult = Apollo.QueryResult<SkillsQuery, SkillsQueryVariables>;
export const SubmitContactDocument = gql`
    mutation SubmitContact($input: SubmitContactInput!) {
  submitContact(input: $input) {
    id
    name
    email
    createdAt
  }
}
    `;
export type SubmitContactMutationFn = Apollo.MutationFunction<SubmitContactMutation, SubmitContactMutationVariables>;

/**
 * __useSubmitContactMutation__
 *
 * To run a mutation, you first call `useSubmitContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitContactMutation, { data, loading, error }] = useSubmitContactMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitContactMutation(baseOptions?: Apollo.MutationHookOptions<SubmitContactMutation, SubmitContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitContactMutation, SubmitContactMutationVariables>(SubmitContactDocument, options);
      }
export type SubmitContactMutationHookResult = ReturnType<typeof useSubmitContactMutation>;
export type SubmitContactMutationResult = Apollo.MutationResult<SubmitContactMutation>;
export type SubmitContactMutationOptions = Apollo.BaseMutationOptions<SubmitContactMutation, SubmitContactMutationVariables>;
export const RunDemoDocument = gql`
    query RunDemo($lang: Language!) {
  runDemo(lang: $lang) {
    steps {
      key
      label
      durationMs
    }
    totalDurationMs
    experiencesCount
    skillsCount
    serverTime
    experiences {
      id
      company
      role
      period
    }
  }
}
    `;

/**
 * __useRunDemoQuery__
 *
 * To run a query within a React component, call `useRunDemoQuery` and pass it any options that fit your needs.
 * When your component renders, `useRunDemoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRunDemoQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useRunDemoQuery(baseOptions: Apollo.QueryHookOptions<RunDemoQuery, RunDemoQueryVariables> & ({ variables: RunDemoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RunDemoQuery, RunDemoQueryVariables>(RunDemoDocument, options);
      }
export function useRunDemoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RunDemoQuery, RunDemoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RunDemoQuery, RunDemoQueryVariables>(RunDemoDocument, options);
        }
// @ts-ignore
export function useRunDemoSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<RunDemoQuery, RunDemoQueryVariables>): Apollo.UseSuspenseQueryResult<RunDemoQuery, RunDemoQueryVariables>;
export function useRunDemoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RunDemoQuery, RunDemoQueryVariables>): Apollo.UseSuspenseQueryResult<RunDemoQuery | undefined, RunDemoQueryVariables>;
export function useRunDemoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<RunDemoQuery, RunDemoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<RunDemoQuery, RunDemoQueryVariables>(RunDemoDocument, options);
        }
export type RunDemoQueryHookResult = ReturnType<typeof useRunDemoQuery>;
export type RunDemoLazyQueryHookResult = ReturnType<typeof useRunDemoLazyQuery>;
export type RunDemoSuspenseQueryHookResult = ReturnType<typeof useRunDemoSuspenseQuery>;
export type RunDemoQueryResult = Apollo.QueryResult<RunDemoQuery, RunDemoQueryVariables>;
export const HealthDocument = gql`
    query Health($lang: Language!) {
  health(lang: $lang)
}
    `;

/**
 * __useHealthQuery__
 *
 * To run a query within a React component, call `useHealthQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useHealthQuery(baseOptions: Apollo.QueryHookOptions<HealthQuery, HealthQueryVariables> & ({ variables: HealthQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthQuery, HealthQueryVariables>(HealthDocument, options);
      }
export function useHealthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthQuery, HealthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthQuery, HealthQueryVariables>(HealthDocument, options);
        }
// @ts-ignore
export function useHealthSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HealthQuery, HealthQueryVariables>): Apollo.UseSuspenseQueryResult<HealthQuery, HealthQueryVariables>;
export function useHealthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthQuery, HealthQueryVariables>): Apollo.UseSuspenseQueryResult<HealthQuery | undefined, HealthQueryVariables>;
export function useHealthSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthQuery, HealthQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HealthQuery, HealthQueryVariables>(HealthDocument, options);
        }
export type HealthQueryHookResult = ReturnType<typeof useHealthQuery>;
export type HealthLazyQueryHookResult = ReturnType<typeof useHealthLazyQuery>;
export type HealthSuspenseQueryHookResult = ReturnType<typeof useHealthSuspenseQuery>;
export type HealthQueryResult = Apollo.QueryResult<HealthQuery, HealthQueryVariables>;
export const ExperiencesDocument = gql`
    query Experiences($lang: Language!) {
  experiences(lang: $lang) {
    id
    kind
    company
    role
    location
    period
    bullets
    stack
    order
  }
}
    `;

/**
 * __useExperiencesQuery__
 *
 * To run a query within a React component, call `useExperiencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useExperiencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExperiencesQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useExperiencesQuery(baseOptions: Apollo.QueryHookOptions<ExperiencesQuery, ExperiencesQueryVariables> & ({ variables: ExperiencesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExperiencesQuery, ExperiencesQueryVariables>(ExperiencesDocument, options);
      }
export function useExperiencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExperiencesQuery, ExperiencesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExperiencesQuery, ExperiencesQueryVariables>(ExperiencesDocument, options);
        }
// @ts-ignore
export function useExperiencesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ExperiencesQuery, ExperiencesQueryVariables>): Apollo.UseSuspenseQueryResult<ExperiencesQuery, ExperiencesQueryVariables>;
export function useExperiencesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExperiencesQuery, ExperiencesQueryVariables>): Apollo.UseSuspenseQueryResult<ExperiencesQuery | undefined, ExperiencesQueryVariables>;
export function useExperiencesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ExperiencesQuery, ExperiencesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ExperiencesQuery, ExperiencesQueryVariables>(ExperiencesDocument, options);
        }
export type ExperiencesQueryHookResult = ReturnType<typeof useExperiencesQuery>;
export type ExperiencesLazyQueryHookResult = ReturnType<typeof useExperiencesLazyQuery>;
export type ExperiencesSuspenseQueryHookResult = ReturnType<typeof useExperiencesSuspenseQuery>;
export type ExperiencesQueryResult = Apollo.QueryResult<ExperiencesQuery, ExperiencesQueryVariables>;
export const ProjectsDocument = gql`
    query Projects($lang: Language!) {
  projects(lang: $lang) {
    id
    kind
    company
    role
    location
    period
    bullets
    stack
    order
  }
}
    `;

/**
 * __useProjectsQuery__
 *
 * To run a query within a React component, call `useProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsQuery({
 *   variables: {
 *      lang: // value for 'lang'
 *   },
 * });
 */
export function useProjectsQuery(baseOptions: Apollo.QueryHookOptions<ProjectsQuery, ProjectsQueryVariables> & ({ variables: ProjectsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
      }
export function useProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
// @ts-ignore
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<ProjectsQuery, ProjectsQueryVariables>;
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>): Apollo.UseSuspenseQueryResult<ProjectsQuery | undefined, ProjectsQueryVariables>;
export function useProjectsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ProjectsQuery, ProjectsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProjectsQuery, ProjectsQueryVariables>(ProjectsDocument, options);
        }
export type ProjectsQueryHookResult = ReturnType<typeof useProjectsQuery>;
export type ProjectsLazyQueryHookResult = ReturnType<typeof useProjectsLazyQuery>;
export type ProjectsSuspenseQueryHookResult = ReturnType<typeof useProjectsSuspenseQuery>;
export type ProjectsQueryResult = Apollo.QueryResult<ProjectsQuery, ProjectsQueryVariables>;