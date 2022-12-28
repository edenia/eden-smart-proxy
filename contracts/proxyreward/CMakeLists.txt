# Build reward.wasm contract
add_executable(reward
    src/actions/voter.cpp
    src/actions/distribution.cpp
    src/voter.cpp
    src/distribution.cpp
    src/reward.cpp
)
target_include_directories(reward PUBLIC include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(reward eosio-contract-simple-malloc)
set_target_properties(reward PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Build reward-debug.wasm
# This is like reward.wasm, but includes debugging information.
# add_executable(reward-debug src/reward.cpp)
# target_include_directories(reward-debug PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
# target_link_libraries(reward-debug eosio-contract-simple-malloc-debug)
# set_target_properties(reward-debug PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate reward.abi
# This is a 2-step process:
# * Build reward.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(reward-abigen src/reward.cpp)
target_include_directories(reward-abigen PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(reward-abigen eosio-contract-abigen)
add_custom_command(TARGET reward-abigen POST_BUILD
    COMMAND cltester reward-abigen.wasm >${PROJECT_BINARY_DIR}/reward.abi
)

# Builds tests.wasm
# Tests must link to either cltestlib (runs faster) or cltestlib-debug (supports debugging)
# add_executable(tests-reward tests/tests-reward.cpp)
# target_include_directories(tests-reward PUBLIC include ./tests/include ../eden/src ../eden/include ../myvoteeosdao/include)
# target_link_libraries(tests-reward cltestlib-debug)
# set_target_properties(tests-reward PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)