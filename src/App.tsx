
import { Input } from "./components/Input"
import { Button } from "./components/Button"
import { LoadingSpinner } from "./components/LoadingSpinner"
import { NoResults } from "./components/NoResults"
import { SuccessMessage } from "./components/SuccessMessage"
import { ErrorMessage } from "./components/ErrorMessage"
import { UseSearch } from "./hooks/UseSearch"
import { Card } from "./components/Card"


function App() {

  const {
    TYPESFORMACION,
    errorMessage,
    handleModal,
    handleRegister,
    handleSearch,
    handleType,
    isModal,
    isRegistering,
    isSearching,
    loading,
    saveFormacion,
    searchBuscar,
    selectedProgram,
    selectedType,
    seterrorMessage,
    setisModal,
    setsuccessMessage,
    successMessage
  } = UseSearch()

  return (
    <div className="flex flex-col justify-center items-center m-10">
      {successMessage && (
        <SuccessMessage message={successMessage} onClose={() => setsuccessMessage("")} />
      )}
      
      {errorMessage && (
        <ErrorMessage message={errorMessage} onClose={() => seterrorMessage("")} />
      )}

      <div className="relative w-full max-w-md">
        <Input 
          placeholder="Buscar programa de formación" 
          values={searchBuscar} 
          onchange={handleSearch} 
        />
        {isSearching && (
          <div className="absolute right-3 top-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      <select 
        className="bg-gray-50 border border-gray-300 p-2 m-2 w-full max-w-md" 
        value={selectedType} 
        onChange={handleType}
        disabled={loading}
      >
        {TYPESFORMACION.map((type) => (
          <option key={type.key} value={type.value}>
            {type.value}
          </option>
        ))}
      </select>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {loading ? (
          <div className="col-span-full">
            <LoadingSpinner />
          </div>
        ) : saveFormacion.length === 0 ? (
          <NoResults />
        ) : (
          saveFormacion.map((formacion) => (
            <Card formacion={formacion} handleModal={() => handleModal(formacion)} key={formacion.id}/>
          ))
        )}
      </div>

      {isModal && selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Confirmar Registro</h2>
              {!isRegistering && (
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setisModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="mb-6">
              <p className="text-lg mb-2">¿Deseas registrarte en:</p>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold">{selectedProgram.nombre}</h3>
                <p className="text-sm text-gray-600">Modalidad: {selectedProgram.modalidad}</p>
                <p className="text-sm text-gray-600">Duración: {selectedProgram.duracion}</p>
              </div>
            </div>
            
            {isRegistering ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
                <span className="text-lg">Procesando registro...</span>
              </div>
            ) : (
              <div className="flex gap-4 justify-end">
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors duration-200"
                  onClick={handleRegister}
                >
                  Registrar
                </button>
                <button
                  className="bg-white border border-gray-300 text-gray-500 px-6 py-2 rounded hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setisModal(false)}
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
export default App

