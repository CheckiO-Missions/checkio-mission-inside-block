from checkio.signals import ON_CONNECT
from checkio import api
from checkio.referees.io import CheckiOReferee

from tests import TESTS

cover = """def cover(f, data):
    return bool(f(tuple(tuple(d) for d in data[0]), tuple(data[1])))
"""

api.add_listener(
    ON_CONNECT,
    CheckiOReferee(
        tests=TESTS,
        cover_code={
            'python-27': cover,  # or None
            'python-3': cover
        },
        function_name="is_inside").on_ready)
