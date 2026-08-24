export function AppFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-4 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
        <span>© {year} Кирилл Бурцев</span>
        <span>React · NestJS · GraphQL · Docker</span>
      </div>
    </footer>
  )
}
