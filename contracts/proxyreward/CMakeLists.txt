# Build proxyreward.wasm contract
add_executable(proxyreward src/proxyreward.cpp)
target_include_directories(proxyreward PUBLIC include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(proxyreward eosio-contract-simple-malloc)
set_target_properties(proxyreward PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build proxyreward-debug.wasm
# This is like proxyreward.wasm, but includes debugging information.
add_executable(proxyreward-debug src/proxyreward.cpp)
target_include_directories(proxyreward-debug PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(proxyreward-debug eosio-contract-simple-malloc-debug)
set_target_properties(proxyreward-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate proxyreward.abi
# This is a 2-step process:
# * Build proxyreward.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(proxyreward-abigen src/proxyreward.cpp)
target_include_directories(proxyreward-abigen PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(proxyreward-abigen eosio-contract-abigen)
add_custom_command(TARGET proxyreward-abigen POST_BUILD
    COMMAND cltester proxyreward-abigen.wasm >${PROJECT_BINARY_DIR}/proxyreward.abi
)

# Builds tests.wasm
# Tests must link to either cltestlib (runs faster) or cltestlib-debug (supports debugging)
add_executable(tests-proxyreward tests/tests-proxyreward.cpp)
target_include_directories(tests-proxyreward PUBLIC include ./tests/include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(tests-proxyreward cltestlib-debug)
set_target_properties(tests-proxyreward PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)