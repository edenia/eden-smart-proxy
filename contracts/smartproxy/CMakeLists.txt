# Build smartproxy.wasm contract
add_executable(smartproxy src/smartproxy.cpp)
target_include_directories(smartproxy PUBLIC include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(smartproxy eosio-contract-simple-malloc)
set_target_properties(smartproxy PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build smartproxy-debug.wasm
# This is like smartproxy.wasm, but includes debugging information.
add_executable(smartproxy-debug src/smartproxy.cpp)
target_include_directories(smartproxy-debug PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(smartproxy-debug eosio-contract-simple-malloc-debug)
set_target_properties(smartproxy-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate smartproxy.abi
# This is a 2-step process:
# * Build smartproxy.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(smartproxy-abigen src/smartproxy.cpp)
target_include_directories(smartproxy-abigen PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(smartproxy-abigen eosio-contract-abigen)
add_custom_command(TARGET smartproxy-abigen POST_BUILD
    COMMAND cltester smartproxy-abigen.wasm >${PROJECT_BINARY_DIR}/smartproxy.abi
)

# Builds tests.wasm
# Tests must link to either cltestlib (runs faster) or cltestlib-debug (supports debugging)
add_executable(tests tests/tests.cpp)
target_include_directories(tests PUBLIC include ./tests/include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(tests cltestlib-debug)
set_target_properties(tests PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)