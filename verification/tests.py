"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        #From examples
        {
            "input":
                [
                    [[1, 1], [1, 3], [3, 3], [3, 1]],
                    [2, 2],
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [1, 3], [3, 3], [3, 1]],
                    [4, 2]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[1, 1], [4, 1], [2, 3]],
                    [3, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [4, 1], [1, 3]],
                    [3, 3]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[2, 1], [4, 1], [5, 3], [3, 4], [1, 3]],
                    [4, 3]
                ],
            "answer": True
        },
        {"input":
             [
                 [[2, 1], [4, 1], [3, 2], [3, 4], [1, 3]],
                 [4, 3]
             ],
         "answer": False

        },
        {
            "input":
                [
                    [[1, 1], [3, 2], [5, 1], [4, 3], [5, 5], [3, 4], [1, 5], [2, 3]],
                    [3, 3]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [1, 5], [5, 5], [5, 4], [2, 4], [2, 2], [5, 2], [5, 1]],
                    [4, 3]
                ],
            "answer": False
        },

    ],
    "Extra": [
        {
            "input":
                [
                    [[3, 4], [4, 2], [2, 1], [1, 3]],
                    [2, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[5, 1], [4, 4], [2, 4], [1, 1]],
                    [3, 5]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[2, 5], [2, 2], [5, 2], [1, 1]],
                    [3, 3]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[1, 1], [1, 3], [3, 3], [3, 1]],
                    [1, 1]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [1, 3], [3, 3], [3, 1]],
                    [3, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [2, 6], [3, 1]],
                    [2, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [1, 3], [2, 4], [4, 4], [4, 3], [2, 1]],
                    [2, 3]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [1, 3], [2, 4], [4, 4], [4, 3], [2, 1]],
                    [3, 1]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[1, 1], [2, 3], [1, 3], [3, 4], [5, 3], [4, 3], [3, 1]],
                    [2, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [2, 3], [1, 3], [3, 4], [5, 3], [4, 3], [3, 1]],
                    [1, 2]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[1, 1], [2, 4], [5, 4], [4, 1], [3, 1], [4, 3], [3, 3], [2, 1]],
                    [2, 2]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [2, 4], [5, 4], [4, 1], [3, 1], [4, 3], [3, 3], [2, 1]],
                    [3, 2]
                ],
            "answer": False
        },
        {
            "input":
                [[[1, 1], [1, 3], [3, 3], [3, 1]], [1, 1]],
            "answer": True
        },

        {
            "input":
                [[[0, 0], [0, 2], [2, 2], [2, 0]], [1, 0]],
            "answer": True
        },
        {
            "input":
                [[[0, 0], [0, 2], [2, 2], [2, 0]], [0, 1]],
            "answer": True
        },

        {
            "input": [[[0, 1], [1, 2], [2, 1], [1, 0]], [1, 1]]
            ,
            "answer": True
        },
        {
            "input": [[[4, 2], [2, 4], [0, 3], [2, 3], [3, 2], [3, 0]],
                      [3, 3]]
            ,
            "answer": True
        },
        {
            "input": [[[0, 0], [1, 1], [0, 2], [1, 3], [0, 4], [2, 4], [2, 0]],
                      [1, 2]]
            ,
            "answer": True
        },
        {
            "input": [[[0, 0], [0, 4], [2, 4], [1, 3], [2, 2], [1, 1], [2, 0]],
                      [1, 2]]
            ,
            "answer": True
        },
        {
            "input": [[[0, 0], [1, 1], [2, 0], [3, 1], [4, 0], [4, 2], [0, 2]],
                      [2, 1]]
            ,
            "answer": True
        },
        {
            "input": [[[0, 0], [4, 0], [4, 2], [3, 1], [2, 2], [1, 1], [0, 2]], [2, 1]]
            ,
            "answer": True
        },

        {
            "input":
                [
                    [[1, 1], [2, 3], [1, 3], [2, 5], [1, 5], [3, 8], [5, 5], [4, 5], [5, 3], [4, 3],
                     [5, 1], [3, 3]],
                    [3, 7]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[1, 1], [2, 3], [1, 3], [2, 5], [1, 5], [3, 8], [5, 5], [4, 5], [5, 3], [4, 3],
                     [5, 1], [3, 3]],
                    [3, 2]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[5, 1], [1, 5], [5, 9], [9, 5], [5, 5]],
                    [5, 5]
                ],
            "answer": True
        },
        {
            "input":
                [
                    [[5, 1], [1, 5], [5, 9], [9, 5], [5, 5]],
                    [6, 4]
                ],
            "answer": False
        },
        {
            "input":
                [
                    [[5, 3], [3, 3], [3, 1], [2, 1], [2, 4], [6, 4], [6, 1], [5, 1]],
                    [4, 2]
                ],
            "answer": False
        }


    ]
}
