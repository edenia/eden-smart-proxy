# Build fund.wasm contract
add_executable(fund src/fund.cpp)
target_include_directories(fund PUBLIC include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(fund eosio-contract-simple-malloc)
set_target_properties(fund PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build fund-debug.wasm
# This is like fund.wasm, but includes debugging information.
# add_executable(fund-debug src/fund.cpp)
# target_include_directories(fund-debug PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
# target_link_libraries(fund-debug eosio-contract-simple-malloc-debug)
# set_target_properties(fund-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate fund.abi
# This is a 2-step process:
# * Build fund.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(fund-abigen src/fund.cpp)
target_include_directories(fund-abigen PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(fund-abigen eosio-contract-abigen)
add_custom_command(TARGET fund-abigen POST_BUILD
    COMMAND cltester fund-abigen.wasm >${PROJECT_BINARY_DIR}/fund.abi
)

# Builds tests.wasm
# Tests must link to either cltestlib (runs faster) or cltestlib-debug (supports debugging)
# add_executable(tests-fund tests/tests-fund.cpp)
# target_include_directories(tests-fund PUBLIC include ./tests/include ../eden/src ../eden/include ../myvoteeosdao/include)
# target_link_libraries(tests-fund cltestlib-debug)
# set_target_properties(tests-fund PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)