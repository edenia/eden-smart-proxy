# Build reward.wasm contract
add_executable(proxyreward
    src/actions/voters.cpp
    src/actions/distributions.cpp
    src/actions/accounts.cpp
    src/voters.cpp
    src/distributions.cpp
    src/accounts.cpp
    src/reward.cpp
)
target_include_directories(proxyreward PUBLIC include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(proxyreward eosio-contract-simple-malloc)
set_target_properties(proxyreward PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})

# Generate reward.abi
# This is a 2-step process:
# * Build reward.abi.wasm. This must link to eosio-contract-abigen.
# * Run the wasm to generate the abi
add_executable(proxyreward-abigen src/reward.cpp)
target_include_directories(proxyreward-abigen PRIVATE include ../eden/src ../eden/include ../myvoteeosdao/include)
target_link_libraries(proxyreward-abigen eosio-contract-abigen)
add_custom_command(TARGET proxyreward-abigen POST_BUILD
    COMMAND cltester proxyreward-abigen.wasm >${PROJECT_BINARY_DIR}/proxyreward.abi
)

# Builds tests-proxyreward.wasm
function(add_test test_file suffix)
    add_executable(${test_file}${suffix} tests/${test_file}.cpp src/accounts.cpp src/distributions.cpp)
    target_include_directories(${test_file}${suffix} PUBLIC include)
    target_include_directories(${test_file}${suffix} PUBLIC
        ./tests/include
        ../eden/src
        ../eden/include
        ../myvoteeosdao/include
        ../../external/atomicassets-contract/include
        ../../libraries/clchain/include
    )
    target_link_libraries(${test_file}${suffix} cltestlib${suffix})
    set_target_properties(${test_file}${suffix} PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${PROJECT_BINARY_DIR})
endfunction()

add_test("tests-proxyreward" "")
add_test("tests-proxyreward" "-debug")

# These symlinks help vscode
execute_process(COMMAND ln -sf ${clsdk_DIR} ${CMAKE_CURRENT_BINARY_DIR}/clsdk)
execute_process(COMMAND ln -sf ${WASI_SDK_PREFIX} ${CMAKE_CURRENT_BINARY_DIR}/wasi-sdk)

# Generate compile_commands.json to aid vscode and other editors
set(CMAKE_EXPORT_COMPILE_COMMANDS on)