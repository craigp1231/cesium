/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */

define(['./when-229515d6', './PrimitivePipeline-a5ee7b8e', './createTaskProcessorWorker', './Transforms-e254a706', './Matrix2-b06ef836', './RuntimeError-ffe03243', './ComponentDatatype-dc3af6a4', './WebGLConstants-4e26b85a', './combine-8ce3f24b', './GeometryAttribute-b662d87a', './GeometryAttributes-b253752a', './GeometryPipeline-78f66d53', './AttributeCompression-0d03c199', './EncodedCartesian3-1c4d2319', './IndexDatatype-87b580b0', './IntersectionTests-8df35d37', './Plane-5d90414b', './WebMercatorProjection-89ad70fb'], (function (when, PrimitivePipeline, createTaskProcessorWorker, Transforms, Matrix2, RuntimeError, ComponentDatatype, WebGLConstants, combine, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  /* global require */

  var moduleCache = {};

  function getModule(moduleName) {
    var module = moduleCache[moduleName];
    if (!when.defined(module)) {
      if (typeof exports === "object") {
        // Use CommonJS-style require.
        moduleCache[module] = module = require("Workers/" + moduleName);
      } else {
        // Use AMD-style require.
        // in web workers, require is synchronous
        require(["Workers/" + moduleName], function (f) {
          module = f;
          moduleCache[module] = f;
        });
      }
    }
    return module;
  }

  function createGeometry(parameters, transferableObjects) {
    var subTasks = parameters.subTasks;
    var length = subTasks.length;
    var resultsOrPromises = new Array(length);

    for (var i = 0; i < length; i++) {
      var task = subTasks[i];
      var geometry = task.geometry;
      var moduleName = task.moduleName;

      if (when.defined(moduleName)) {
        var createFunction = getModule(moduleName);
        resultsOrPromises[i] = createFunction(geometry, task.offset);
      } else {
        //Already created geometry
        resultsOrPromises[i] = geometry;
      }
    }

    return when.when.all(resultsOrPromises, function (results) {
      return PrimitivePipeline.PrimitivePipeline.packCreateGeometryResults(
        results,
        transferableObjects
      );
    });
  }
  var createGeometry$1 = createTaskProcessorWorker(createGeometry);

  return createGeometry$1;

}));
//# sourceMappingURL=createGeometry.js.map
