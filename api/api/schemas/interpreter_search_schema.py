from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field

from api.schemas.interpreter_schema import InterpreterBase
from api.schemas.location_schema import LocationSchema
from api.schemas.booking_schema import BookingSearchResponseSchema



class DatesSchema(BaseModel):
    arrivalTime: Optional[str]
    date: Optional[datetime]
    period: Optional[str]


class CrcDateRangeSchema(BaseModel):
    endDate: Optional[str]
    startDate: Optional[str]


class InterpreterSearchRequestSchema(BaseModel):    
    language:  Optional[str]
    level: Optional[List[str]]
    city: Optional[str]
    dates: Optional[List[DatesSchema]]
    name: Optional[str]
    keywords: Optional[str]
    active: Optional[bool]
    criminalRecordCheck: Optional[CrcDateRangeSchema]
    courtAddr: Optional[str]
    distanceLimit: Optional[bool]
    location: Optional[LocationSchema]


class InterpreterSearchResponseSchema(InterpreterBase):    
    id: int     
    events: Optional[List] = []
    booking: Optional[List[BookingSearchResponseSchema]] = []
    created_at: Optional[datetime]


class InterpreterDataInExcelRequestSchema(BaseModel):
    ids: List[int]
