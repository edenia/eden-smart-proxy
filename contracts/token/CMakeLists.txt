# Build token.wasm contract
add_executable(token src/token.cpp)
target_include_directories(token PUBLIC include/token)
target_link_libraries(token eosio-contract-simple-malloc)
set_target_properties(token PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build token-debug.wasm
# This is like token.wasm, but includes debugging information.
add_executable(token-debug src/token.cpp)
target_include_directories(token-debug PRIVATE include/token)
target_link_libraries(token-debug eosio-contract-simple-malloc-debug)
set_target_properties(token-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate token.abi
# This is a 2-step process:
# * Build token.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(token-abigen src/token.cpp)
target_include_directories(token-abigen PRIVATE include/token)
target_link_libraries(token-abigen eosio-contract-abigen)
add_custom_command(TARGET token-abigen POST_BUILD
    COMMAND cltester token-abigen.wasm >${PROJECT_BINARY_DIR}/token.abi
)

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)