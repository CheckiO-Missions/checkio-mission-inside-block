from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee
from checkio.referees import cover_codes

from tests import TESTS

cover = """def cover(f, data):
    return bool(f(tuple(tuple(d) for d in data[0]), tuple(data[1])))
"""

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        function_name={
            "python": "is_inside",
            "js": "isInside"
        },
        cover_code={
            'python-3': cover,
            'js-node': cover_codes.js_unwrap_args
        }).on_ready)
