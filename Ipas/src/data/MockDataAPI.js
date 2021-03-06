import { Text } from 'react-native';
import React, { Component } from 'react';
import { recipes, categories, ingredients } from './dataArrays';
import {workList} from './ApiCalls';

export function getWorkTitle(wtitle) {
  const Worktitle = wtitle.toUpperCase();
  const dataArray = [];
  workList.map(data => {
    if (data.WorkTitle.toUpperCase().includes(Worktitle)) {
      dataArray.push(data);
    }
  });
  return dataArray;
}

export function getWorkCode(wcode) {
  console.log(wcode);
  const Workcode = wcode.toUpperCase();
  const data1Array = [];
  workList.map(data => {
    let id=JSON.stringify(data.WorkId).toUpperCase()
    if (id.includes(Workcode)) {
      data1Array.push(data);
    }
  });
  return data1Array;
}

export function getPlanType(wcode) {
  console.log(wcode);
  const Workcode = wcode.toUpperCase();
  const data2Array = [];
  workList.map(data => {
    let id=JSON.stringify(data.Plantype).toUpperCase()
    if (id.includes(Workcode)) {
      data2Array.push(data);
    }
  });
  return data2Array;
}