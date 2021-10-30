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

define(['./CylinderGeometry-d63cea8c', './when-229515d6', './GeometryOffsetAttribute-036749bc', './RuntimeError-ffe03243', './Transforms-e254a706', './Matrix2-b06ef836', './ComponentDatatype-dc3af6a4', './WebGLConstants-4e26b85a', './combine-8ce3f24b', './CylinderGeometryLibrary-421d70ff', './GeometryAttribute-b662d87a', './GeometryAttributes-b253752a', './IndexDatatype-87b580b0', './VertexFormat-64c5c4fb'], (function (CylinderGeometry, when, GeometryOffsetAttribute, RuntimeError, Transforms, Matrix2, ComponentDatatype, WebGLConstants, combine, CylinderGeometryLibrary, GeometryAttribute, GeometryAttributes, IndexDatatype, VertexFormat) { 'use strict';

  function createCylinderGeometry(cylinderGeometry, offset) {
    if (when.defined(offset)) {
      cylinderGeometry = CylinderGeometry.CylinderGeometry.unpack(cylinderGeometry, offset);
    }
    return CylinderGeometry.CylinderGeometry.createGeometry(cylinderGeometry);
  }

  return createCylinderGeometry;

}));
//# sourceMappingURL=createCylinderGeometry.js.map
