# Build myvoteeosdao.wasm contract
add_executable(myvoteeosdao src/myvoteeosdao.cpp)
target_include_directories(myvoteeosdao PUBLIC include)
target_link_libraries(myvoteeosdao eosio-contract-simple-malloc)
set_target_properties(myvoteeosdao PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build myvoteeosdao-debug.wasm
# This is like myvoteeosdao.wasm, but includes debugging information.
# add_executable(myvoteeosdao-debug src/myvoteeosdao.cpp)
# target_include_directories(myvoteeosdao-debug PRIVATE include)
# target_link_libraries(myvoteeosdao-debug eosio-contract-simple-malloc-debug)
# set_target_properties(myvoteeosdao-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate myvoteeosdao.abi
# This is a 2-step process:
# * Build myvoteeosdao.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(myvoteeosdao-abigen src/myvoteeosdao.cpp)
target_include_directories(myvoteeosdao-abigen PRIVATE include)
target_link_libraries(myvoteeosdao-abigen eosio-contract-abigen)
add_custom_command(TARGET myvoteeosdao-abigen POST_BUILD
    COMMAND cltester myvoteeosdao-abigen.wasm >${PROJECT_BINARY_DIR}/myvoteeosdao.abi
)

# Builds tests.wasm
# Tests must link to either cltestlib (runs faster) or cltestlib-debug (supports debugging)
# add_executable(tests tests/tests.cpp)
# target_include_directories(tests PUBLIC include ./tests/include)
# target_link_libraries(tests cltestlib-debug)
# set_target_properties(tests PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)