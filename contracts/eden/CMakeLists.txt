# Build eden.wasm contract
add_executable(eden src/eden.cpp)
target_include_directories(eden PUBLIC include)
target_link_libraries(eden eosio-contract-simple-malloc)
set_target_properties(eden PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build eden-debug.wasm
# This is like eden.wasm, but includes debugging information.
# add_executable(eden-debug src/eden.cpp)
# target_include_directories(eden-debug PRIVATE include)
# target_link_libraries(eden-debug eosio-contract-simple-malloc-debug)
# set_target_properties(eden-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate eden.abi
# This is a 2-step process:
#   * Build eden.abi.wasm. This must link to eosio-contract-abigen.
#   * Run the wasm to generate the abi
add_executable(eden-abigen src/eden.cpp)
target_include_directories(eden-abigen PRIVATE include)
target_link_libraries(eden-abigen eosio-contract-abigen)
add_custom_command(TARGET eden-abigen POST_BUILD
    COMMAND cltester eden-abigen.wasm >${PROJECT_BINARY_DIR}/eden.abi
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