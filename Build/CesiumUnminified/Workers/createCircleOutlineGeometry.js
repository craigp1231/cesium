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

define(['./Matrix2-b06ef836', './RuntimeError-ffe03243', './when-229515d6', './EllipseOutlineGeometry-4988a3ba', './ComponentDatatype-dc3af6a4', './WebGLConstants-4e26b85a', './GeometryOffsetAttribute-036749bc', './Transforms-e254a706', './combine-8ce3f24b', './EllipseGeometryLibrary-47c965ca', './GeometryAttribute-b662d87a', './GeometryAttributes-b253752a', './IndexDatatype-87b580b0'], (function (Matrix2, RuntimeError, when, EllipseOutlineGeometry, ComponentDatatype, WebGLConstants, GeometryOffsetAttribute, Transforms, combine, EllipseGeometryLibrary, GeometryAttribute, GeometryAttributes, IndexDatatype) { 'use strict';

  /**
   * A description of the outline of a circle on the ellipsoid.
   *
   * @alias CircleOutlineGeometry
   * @constructor
   *
   * @param {Object} options Object with the following properties:
   * @param {Cartesian3} options.center The circle's center point in the fixed frame.
   * @param {Number} options.radius The radius in meters.
   * @param {Ellipsoid} [options.ellipsoid=Ellipsoid.WGS84] The ellipsoid the circle will be on.
   * @param {Number} [options.height=0.0] The distance in meters between the circle and the ellipsoid surface.
   * @param {Number} [options.granularity=0.02] The angular distance between points on the circle in radians.
   * @param {Number} [options.extrudedHeight=0.0] The distance in meters between the circle's extruded face and the ellipsoid surface.
   * @param {Number} [options.numberOfVerticalLines=16] Number of lines to draw between the top and bottom of an extruded circle.
   *
   * @exception {DeveloperError} radius must be greater than zero.
   * @exception {DeveloperError} granularity must be greater than zero.
   *
   * @see CircleOutlineGeometry.createGeometry
   * @see Packable
   *
   * @example
   * // Create a circle.
   * var circle = new Cesium.CircleOutlineGeometry({
   *   center : Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
   *   radius : 100000.0
   * });
   * var geometry = Cesium.CircleOutlineGeometry.createGeometry(circle);
   */
  function CircleOutlineGeometry(options) {
    options = when.defaultValue(options, when.defaultValue.EMPTY_OBJECT);
    var radius = options.radius;

    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.typeOf.number("radius", radius);
    //>>includeEnd('debug');

    var ellipseGeometryOptions = {
      center: options.center,
      semiMajorAxis: radius,
      semiMinorAxis: radius,
      ellipsoid: options.ellipsoid,
      height: options.height,
      extrudedHeight: options.extrudedHeight,
      granularity: options.granularity,
      numberOfVerticalLines: options.numberOfVerticalLines,
    };
    this._ellipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry(ellipseGeometryOptions);
    this._workerName = "createCircleOutlineGeometry";
  }

  /**
   * The number of elements used to pack the object into an array.
   * @type {Number}
   */
  CircleOutlineGeometry.packedLength = EllipseOutlineGeometry.EllipseOutlineGeometry.packedLength;

  /**
   * Stores the provided instance into the provided array.
   *
   * @param {CircleOutlineGeometry} value The value to pack.
   * @param {Number[]} array The array to pack into.
   * @param {Number} [startingIndex=0] The index into the array at which to start packing the elements.
   *
   * @returns {Number[]} The array that was packed into
   */
  CircleOutlineGeometry.pack = function (value, array, startingIndex) {
    //>>includeStart('debug', pragmas.debug);
    RuntimeError.Check.typeOf.object("value", value);
    //>>includeEnd('debug');
    return EllipseOutlineGeometry.EllipseOutlineGeometry.pack(
      value._ellipseGeometry,
      array,
      startingIndex
    );
  };

  var scratchEllipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry({
    center: new Matrix2.Cartesian3(),
    semiMajorAxis: 1.0,
    semiMinorAxis: 1.0,
  });
  var scratchOptions = {
    center: new Matrix2.Cartesian3(),
    radius: undefined,
    ellipsoid: Matrix2.Ellipsoid.clone(Matrix2.Ellipsoid.UNIT_SPHERE),
    height: undefined,
    extrudedHeight: undefined,
    granularity: undefined,
    numberOfVerticalLines: undefined,
    semiMajorAxis: undefined,
    semiMinorAxis: undefined,
  };

  /**
   * Retrieves an instance from a packed array.
   *
   * @param {Number[]} array The packed array.
   * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
   * @param {CircleOutlineGeometry} [result] The object into which to store the result.
   * @returns {CircleOutlineGeometry} The modified result parameter or a new CircleOutlineGeometry instance if one was not provided.
   */
  CircleOutlineGeometry.unpack = function (array, startingIndex, result) {
    var ellipseGeometry = EllipseOutlineGeometry.EllipseOutlineGeometry.unpack(
      array,
      startingIndex,
      scratchEllipseGeometry
    );
    scratchOptions.center = Matrix2.Cartesian3.clone(
      ellipseGeometry._center,
      scratchOptions.center
    );
    scratchOptions.ellipsoid = Matrix2.Ellipsoid.clone(
      ellipseGeometry._ellipsoid,
      scratchOptions.ellipsoid
    );
    scratchOptions.height = ellipseGeometry._height;
    scratchOptions.extrudedHeight = ellipseGeometry._extrudedHeight;
    scratchOptions.granularity = ellipseGeometry._granularity;
    scratchOptions.numberOfVerticalLines = ellipseGeometry._numberOfVerticalLines;

    if (!when.defined(result)) {
      scratchOptions.radius = ellipseGeometry._semiMajorAxis;
      return new CircleOutlineGeometry(scratchOptions);
    }

    scratchOptions.semiMajorAxis = ellipseGeometry._semiMajorAxis;
    scratchOptions.semiMinorAxis = ellipseGeometry._semiMinorAxis;
    result._ellipseGeometry = new EllipseOutlineGeometry.EllipseOutlineGeometry(scratchOptions);
    return result;
  };

  /**
   * Computes the geometric representation of an outline of a circle on an ellipsoid, including its vertices, indices, and a bounding sphere.
   *
   * @param {CircleOutlineGeometry} circleGeometry A description of the circle.
   * @returns {Geometry|undefined} The computed vertices and indices.
   */
  CircleOutlineGeometry.createGeometry = function (circleGeometry) {
    return EllipseOutlineGeometry.EllipseOutlineGeometry.createGeometry(circleGeometry._ellipseGeometry);
  };

  function createCircleOutlineGeometry(circleGeometry, offset) {
    if (when.defined(offset)) {
      circleGeometry = CircleOutlineGeometry.unpack(circleGeometry, offset);
    }
    circleGeometry._ellipseGeometry._center = Matrix2.Cartesian3.clone(
      circleGeometry._ellipseGeometry._center
    );
    circleGeometry._ellipseGeometry._ellipsoid = Matrix2.Ellipsoid.clone(
      circleGeometry._ellipseGeometry._ellipsoid
    );
    return CircleOutlineGeometry.createGeometry(circleGeometry);
  }

  return createCircleOutlineGeometry;

}));
//# sourceMappingURL=createCircleOutlineGeometry.js.map
