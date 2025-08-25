export const NoResults = () => (
  <div className="col-span-3 flex flex-col items-center justify-center py-12">
    <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.441-1.01-5.893-2.62l8.893.62z" />
    </svg>
    <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron programas</h3>
    <p className="text-gray-500">Intenta ajustar tu búsqueda o filtros</p>
  </div>
)